"use client"

import { useEffect, useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, ImageIcon, Link, Plus, Trash2, Video } from "lucide-react"



export function CourseDialog({ open, onOpenChange, onSave, course }) {
    const [formData, setFormData] = useState({
        code: "",
        name: "",
        description: "",
        schedule: "",
        credits: 3,
        enrollment: 0,
        maxEnrollment: 30,
        status: "Active",
        resources: [],
    })

    const [errors, setErrors] = useState({})
    const [activeTab, setActiveTab] = useState("details")
    const [newResource, setNewResource] = useState({
        type: "pdf",
        title: "",
        url: "",
    })
    const [resourceErrors, setResourceErrors] = useState({})

    useEffect(() => {
        if (course) {
            setFormData({
                code: course.code,
                name: course.name,
                description: course.description,
                schedule: course.schedule,
                credits: course.credits,
                enrollment: course.enrollment,
                maxEnrollment: course.maxEnrollment,
                status: course.status,
                resources: [...course.resources],
            })
        } else {
            setFormData({
                code: "",
                name: "",
                description: "",
                schedule: "",
                credits: 3,
                enrollment: 0,
                maxEnrollment: 30,
                status: "Active",
                resources: [],
            })
        }
        setErrors({})
        setActiveTab("details")
        setNewResource({
            type: "pdf",
            title: "",
            url: "",
        })
        setResourceErrors({})
    }, [course, open])

    const handleChange = (field) => {
        setFormData((prev, value) => ({
            ...prev,
            [field]: value,
        }))

        // Clear error when field is edited
        if (errors[field]) {
            setErrors((prev) => {
                const newErrors = { ...prev }
                delete newErrors[field]
                return newErrors
            })
        }
    }

    const handleResourceChange = (field) => {
        setNewResource((prev) => ({
            ...prev,
            [field]: value,
        }))

        // Clear error when field is edited
        if (resourceErrors[field]) {
            setResourceErrors((prev) => {
                const newErrors = { ...prev }
                delete newErrors[field]
                return newErrors
            })
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.code.trim()) {
            newErrors.code = "Course code is required"
        }

        if (!formData.name.trim()) {
            newErrors.name = "Course name is required"
        }

        if (!formData.schedule.trim()) {
            newErrors.schedule = "Schedule is required"
        }

        if (formData.maxEnrollment <= 0) {
            newErrors.maxEnrollment = "Maximum enrollment must be greater than 0"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const validateResource = () => {
        const newErrors = {}

        if (!newResource.title.trim()) {
            newErrors.title = "Resource title is required"
        }

        if (!newResource.url.trim()) {
            newErrors.url = "Resource URL is required"
        }

        setResourceErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const addResource = () => {
        if (validateResource()) {
            const resource = {
                ...newResource,
                id: Math.random().toString(36).substring(2, 9),
            }

            setFormData((prev) => ({
                ...prev,
                resources: [...prev.resources, resource],
            }))

            setNewResource({
                type: "pdf",
                title: "",
                url: "",
            })
        }
    }

    const removeResource = (id) => {
        setFormData((prev) => ({
            ...prev,
            resources: prev.resources.filter((resource) => resource.id !== id),
        }))
    }

    const handleSubmit = () => {
        if (validateForm()) {
            if (course) {
                onSave({ ...formData, id: course.id })
            } else {
                onSave(formData)
            }
            onOpenChange(false)
        }
    }

    const getResourceIcon = (type) => {
        switch (type) {
            case "pdf":
                return <FileText className="h-4 w-4" />
            case "video":
                return <Video className="h-4 w-4" />
            case "image":
                return <ImageIcon className="h-4 w-4" />
            case "link":
                return <Link className="h-4 w-4" />
            default:
                return <FileText className="h-4 w-4" />
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{course ? "Edit Course" : "Add New Course"}</DialogTitle>
                    <DialogDescription>
                        {course ? "Update the course details below." : "Fill in the details to create a new course."}
                    </DialogDescription>
                </DialogHeader>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="details">Course Details</TabsTrigger>
                        <TabsTrigger value="resources">Resources</TabsTrigger>
                    </TabsList>

                    <TabsContent value="details" className="space-y-4 mt-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="code">Course Code</Label>
                                <Input
                                    id="code"
                                    value={formData.code}
                                    onChange={(e) => handleChange("code", e.target.value)}
                                    className={errors.code ? "border-destructive" : ""}
                                />
                                {errors.code && <p className="text-sm text-destructive">{errors.code}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="credits">Credits</Label>
                                <Input
                                    id="credits"
                                    type="number"
                                    min={1}
                                    max={6}
                                    value={formData.credits}
                                    onChange={(e) => handleChange("credits", Number.parseInt(e.target.value))}
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="name">Course Name</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                                className={errors.name ? "border-destructive" : ""}
                            />
                            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                rows={3}
                                value={formData.description}
                                onChange={(e) => handleChange("description", e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="schedule">Schedule</Label>
                            <Input
                                id="schedule"
                                value={formData.schedule}
                                onChange={(e) => handleChange("schedule", e.target.value)}
                                placeholder="e.g., Mon, Wed 10:00 - 11:30 AM"
                                className={errors.schedule ? "border-destructive" : ""}
                            />
                            {errors.schedule && <p className="text-sm text-destructive">{errors.schedule}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="enrollment">Current Enrollment</Label>
                                <Input
                                    id="enrollment"
                                    type="number"
                                    min={0}
                                    value={formData.enrollment}
                                    onChange={(e) => handleChange("enrollment", Number.parseInt(e.target.value))}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="maxEnrollment">Maximum Enrollment</Label>
                                <Input
                                    id="maxEnrollment"
                                    type="number"
                                    min={1}
                                    value={formData.maxEnrollment}
                                    onChange={(e) => handleChange("maxEnrollment", Number.parseInt(e.target.value))}
                                    className={errors.maxEnrollment ? "border-destructive" : ""}
                                />
                                {errors.maxEnrollment && <p className="text-sm text-destructive">{errors.maxEnrollment}</p>}
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="status">Status</Label>
                            <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                                <SelectTrigger id="status">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="Inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </TabsContent>

                    <TabsContent value="resources" className="space-y-4 mt-4">
                        <div className="border rounded-md p-4">
                            <h3 className="text-sm font-medium mb-3">Add New Resource</h3>
                            <div className="grid gap-4">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="resourceType">Type</Label>
                                        <Select
                                            value={newResource.type}
                                            onValueChange={(value) => handleResourceChange("type", value)}
                                        >
                                            <SelectTrigger id="resourceType">
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="pdf">PDF</SelectItem>
                                                <SelectItem value="video">Video</SelectItem>
                                                <SelectItem value="image">Image</SelectItem>
                                                <SelectItem value="link">Link</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2 col-span-2">
                                        <Label htmlFor="resourceTitle">Title</Label>
                                        <Input
                                            id="resourceTitle"
                                            value={newResource.title}
                                            onChange={(e) => handleResourceChange("title", e.target.value)}
                                            className={resourceErrors.title ? "border-destructive" : ""}
                                        />
                                        {resourceErrors.title && <p className="text-sm text-destructive">{resourceErrors.title}</p>}
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="resourceUrl">URL</Label>
                                    <Input
                                        id="resourceUrl"
                                        value={newResource.url}
                                        onChange={(e) => handleResourceChange("url", e.target.value)}
                                        placeholder="https://example.com/resource"
                                        className={resourceErrors.url ? "border-destructive" : ""}
                                    />
                                    {resourceErrors.url && <p className="text-sm text-destructive">{resourceErrors.url}</p>}
                                </div>
                                <Button type="button" onClick={addResource} className="w-full">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Resource
                                </Button>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium mb-3">Current Resources</h3>
                            {formData.resources.length === 0 ? (
                                <p className="text-sm text-muted-foreground text-center py-4">No resources added yet.</p>
                            ) : (
                                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                                    {formData.resources.map((resource) => (
                                        <div key={resource.id} className="flex items-center justify-between p-3 border rounded-md">
                                            <div className="flex items-center gap-2 overflow-hidden">
                                                {getResourceIcon(resource.type)}
                                                <div className="overflow-hidden">
                                                    <p className="font-medium text-sm truncate">{resource.title}</p>
                                                    <p className="text-xs text-muted-foreground truncate">{resource.url}</p>
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeResource(resource.id)}
                                                className="h-8 w-8 text-destructive hover:text-destructive"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                <span className="sr-only">Remove resource</span>
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </TabsContent>
                </Tabs>

                <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit}>{course ? "Save Changes" : "Add Course"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

